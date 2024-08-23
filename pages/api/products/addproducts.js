// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToDb from "@/middleware/mongoose";
import Product from "@/schemas/Product";
const handler=async (req, res)=> {
    connectToDb()
    if(req.method=="POST"){
        const data=JSON.parse(req.body)
        try{
        for(let i=0;i<data.length;i++){
            const product=new Product({
            title: data[i].title,
            slug:data[i].slug,
            desc:data[i].desc,
            img:data[i].img==''?'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg':data[i].img,
            
            category:data[i].category,
            size:data[i].size,
            color:data[i].color,
            price:data[i].price,
            availableQuantity:data[i].availableQuantity,
        
            })
            await product.save()
        }
        res.status(200).json({ success:true,msg:'Added successfully !'});
    }catch(error){
        console.log(error)
        if(error.keyPattern&&error.keyPattern.slug==1){
            res.status(200).json({ success:false,msg:'Slug already exists !' });
            return
        }
        res.status(200).json({ success:false,msg:'Some error occured !' });
    }
    }
    else{
        res.status(400).json({ error:"Cannot handle this type of request" });
    }
  }
export default handler