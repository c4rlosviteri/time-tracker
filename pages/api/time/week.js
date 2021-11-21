import dayjs from "dayjs";
import dbConnect from "lib/database";
import Time from "models/Time";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const time = await Time.find({
          timestamp: {
            $gte: dayjs().startOf("week").toDate(),
            $lte: dayjs().endOf("week").toDate(),
          },
        });
        res.status(200).json({ success: true, data: time });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
