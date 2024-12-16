import TemperatureModel from "../models/Temperature";

const AddTemperature = async (req: any, res: any) => {
  const body = req.body;
  const { DeviceID } = body;
  try {
    const newTemperature = new TemperatureModel(body);
    await newTemperature.save();

    res.status(200).json({
      data: newTemperature,
      message: "add temperature successfully!!!",
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const getTemperature = async (req: any, res: any) => {
  const { page, pageSize } = req.query;
  try {
    const skip = (Number(page) - 1) * Number(pageSize);
    const total = await TemperatureModel.countDocuments();
    const temperature = await TemperatureModel.find()
      .skip(skip)
      .limit(Number(pageSize));
    res.status(200).json({
      data: {
        temperature,
        totalItem: total,
      },

      message: "get temperature successfully!!!",
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export { AddTemperature, getTemperature };
