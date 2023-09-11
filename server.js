const app = require('./config/express');
require('dotenv').config();
const port = process.env.PORT || 3200;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
