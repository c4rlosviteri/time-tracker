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
            $gte: dayjs().startOf("day").toDate(),
            $lte: dayjs().endOf("day").toDate(),
          },
        });
        res.status(200).json({ success: true, data: time });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const time = await Time.create(JSON.parse(req.body));
        res.status(201).json({ success: true, data: time });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
