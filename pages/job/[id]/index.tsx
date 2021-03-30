import axios from 'axios'

const Job = ({article}) => {
    return (
        <div>
            Article
        </div>
    )
}


// export const getStaticProps = async(context)=>{
//     const res = await axios(`http://localhost:3000/api/selectedJob?id=${context.params.id}`)
//     const article = res.data
//     return{
//         props:{
//             article,
//         }
//     }
// }

// export const getStaticPaths = async ()=>{
//     const res = await axios('http://localhost:3000/api/allJobs')
//     const articles = res.data
//     const ids = articles.map(article => article.id)
//     const paths = ids.map(id => ({params: {id: id.toString()}}))
//     return{
//         paths: paths,
//         fallback: false,
//     }
// }


export default Job