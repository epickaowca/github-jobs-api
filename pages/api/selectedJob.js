import axios from 'axios'


export default async(req, res) => {
    const jobId = req.query.id
    const URL = `https://jobs.github.com/positions/${jobId}.json`
    const response = await axios(URL)

    res.status(200).json(response.data)
}
