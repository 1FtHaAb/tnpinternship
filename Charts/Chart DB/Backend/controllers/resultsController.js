const data = require("../data/data.json");

const getResults = async (req, res) => {
  try {
    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );
    const { company, dataType, year, charts } = req.body;

    const companyData = data.find((item) => item.company === company);

    if (!companyData) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    const metricData = companyData[dataType];

    if (!metricData) {
      return res.status(404).json({
        message: "Data type not found",
      });
    }

    const yearDataObject = metricData.find((item) => item[year]);

    if (!yearDataObject) {
      return res.status(404).json({
        message: "Year data not found",
      });
    }

    const values = yearDataObject[year];

    const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    res.status(200).json({ company, dataType, year, charts, months, values,});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getResults,
};