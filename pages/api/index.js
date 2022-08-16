import {inputs} from "../../data/userInputs"

export default function handler(req, res) {
    if (req.method === "GET"){
        res.status(200).json(inputs)
    } else if (req.method === "POST"){
        const input = req.body.input
        const newInput = {
            id: Date.now(),
            name: input
        }
        inputs.push(newInput)
        res.status(200).json(newInput)
    }
  }