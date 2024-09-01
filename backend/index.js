import express from 'express';
import ImageKit from 'imagekit';

const app = express();

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY
});

app.get('/api/upload', (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running at port ${port}...`));
