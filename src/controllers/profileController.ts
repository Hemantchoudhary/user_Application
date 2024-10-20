
export const profile = async(req: any, res: any) => {
    try{
        const user = req.user; 
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    
        return res.json({
           data : user
        });
    }catch(err){
        console.log(err);
        return res.json({
            err : err?.message
         });
    }
};
