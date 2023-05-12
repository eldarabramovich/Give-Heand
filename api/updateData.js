const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

async function updateData() {
  const fetch = (await import('node-fetch')).default;

  const updateJSON = async () => {
    try {
      const response = await fetch('https://data.gov.il/api/3/action/datastore_search?resource_id=be5b7935-3922-45d4-9638-08871b17ec95&offset=63000');
      const data = await response.json();
      fs.writeFileSync(path.join(__dirname, 'associationsData.json'), JSON.stringify(data.result.records, null, 2));
      console.log('JSON data updated successfully');
    } catch (error) {
      console.error('Error updating JSON data:', error);
    }
  };

  // Schedule the updateJSON function to run every 2 weeks
  cron.schedule('0 0 */14 * *', updateJSON);

  // Run the updateJSON function once when the script starts
  updateJSON();
}

updateData();