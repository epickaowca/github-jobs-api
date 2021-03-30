import axios from 'axios'


export default async(req, res) => {
  let dataArr = []
  let i = 1
  const grabAll = async()=>{
    let booleanOfInfinite = true
    while(booleanOfInfinite){
      const URL = `https://jobs.github.com/positions.json?page=${i}`
      const response = await axios(URL)
      dataArr.push(...response.data)
      i++
      if(response.data.length < 50){
        booleanOfInfinite = false
      }
    }
  }
  await grabAll()
  res.status(200).json(dataArr)
}
