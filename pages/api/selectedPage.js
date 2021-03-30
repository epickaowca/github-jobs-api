import axios from 'axios'


export default async(req, res) => {
    const page = req.query.page
    const fullTime = req.query.fullTime
    const location = req.query.location
    const description = req.query.description

    const URL = `https://jobs.github.com/positions.json?${page ? 'page='+page : ''}${description ? '&description='+description : ''}${fullTime ? '&full_time=true' : ''}${location ? '&location='+location : ''}`
    const response = await axios(URL)

    res.status(200).json(response.data)
}