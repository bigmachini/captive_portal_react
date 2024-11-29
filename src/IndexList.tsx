import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button, Grid, Container } from '@mui/material';

interface Package {
  id: number;
  name: string;
  uptime: string;
}

interface AppData {
  mac: string;
  ip: string;
  link_login: string;
  link_login_only: string;
  error: string;
}

interface IndexListProps {
  businessName: string;
  packages: Package[];
  appData: AppData;
  onSubscribe: (phone: string, packageId: number) => void;
}

const IndexList: React.FC<IndexListProps> = ({ businessName, packages, onSubscribe }) => {
  const [formData, setFormData] = useState<{ [key: number]: { phone: string } }>({});

  useEffect(() => {
    const initialFormData = packages.reduce((acc, pkg) => {
      acc[pkg.id] = { phone: '' };
      return acc;
    }, {} as { [key: number]: { phone: string } });
    setFormData(initialFormData);
  }, [packages]);

  const handleInputChange = (id: number, value: string) => {
    setFormData({ ...formData, [id]: { phone: value } });
  };

  const handleSubscribe = (id: number) => {
    const phone = formData[id]?.phone;
    if (phone) {
      onSubscribe(phone, id);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        {businessName}
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        Available Packages
      </Typography>
      <Grid container spacing={3}>
        {packages.map(pkg => (
          <Grid item xs={12} sm={6} md={4} key={pkg.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" align="center">
                  {pkg.name}
                </Typography>
                <Typography variant="body1" align="center">
                  Validity: {pkg.uptime}
                </Typography>
                <TextField
                  id={`phone_${pkg.id}`}
                  label="Enter your phone number"
                  type="tel"
                  name="phone"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData[pkg.id]?.phone || ''}
                  onChange={e => handleInputChange(pkg.id, e.target.value)}
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleSubscribe(pkg.id)}
                >
                  Subscribe
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default IndexList;