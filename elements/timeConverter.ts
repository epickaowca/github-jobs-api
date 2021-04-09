const timeConverter = (time)=>{
    const datanowa:any = new Date()
    const datanowa2:any = time
    const datanowa3:any =  new Date(datanowa2.replace(/-/g,'/'))
    const milisecondsData = Math.abs(datanowa - datanowa3)
    let howManyAgo
    if(time){
        if(milisecondsData > 0 && milisecondsData < 60000){
            howManyAgo = 'przed chwilą'
        }else if(milisecondsData >= 60000 && milisecondsData <3600000){
          const result = milisecondsData/60000
          howManyAgo = result.toFixed(0)+'min ago'
        }else if(milisecondsData >= 3600000 && milisecondsData <86400000){
          const result = milisecondsData/3600000
          howManyAgo = result.toFixed(0)+'hours ago'
        }else {
          const result = milisecondsData/86400000
          howManyAgo = result.toFixed(0)+'days ago'
        }
    }
    return howManyAgo
}

export default timeConverter