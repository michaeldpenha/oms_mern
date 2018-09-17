import { Request, Response, Router } from 'express';
import Items from '../models/items';

export class ItemsRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * routes
     */
    public routes = () => {
        this.router.get('/', this.fetchItems);
        this.router.post('/', this.addItems);
        this.router.put('/',this.updateItems);
        this.router.delete('/:itemName',this.deleteItems);
        this.router.get('/:itemName',this.fetchItemInfo)
    }
    /**
     * fetchItems
     */
    public fetchItems = (req: Request, res: Response) => {
        Items.find().then(data => {
            res.status(200).json({message : 'Successfully fetched records !!' ,  data });
        }, err => {
            res.status(500).json({ message : 'Service error occured' , err });
        })
    }
    /**
     * addItems
     */
    public addItems = (req: Request, res: Response): void => {
        const {
            itemName,
            itemInStock,
            itemImgUrl,
            itemDescription
        } = req.body;
        const item = new Items({
            itemName,
            itemInStock,
            itemImgUrl,
            itemDescription
        });
        Items.count({itemName : itemName}).then(data => {
            (!data) ? this.saveItem(item,req,res) : res.status(302).json({message : 'Item already exists'}); 
        },err => {
            res.status(500).json({message : 'Service error occured',err})
        });
    }
    /**
     * saveItem
     */
    public saveItem = (item : any,req: Request, res: Response) => {
        item.save().then(data => {
            res.status(201).json({message : 'Item Added successfully',data});
        },err=>{
            res.status(500).json({message : 'Service error occured' , err});
        });
    }
    /**
     * updateItems
     */
    public updateItems = (req : Request, res : Response) : void => {
        const {
            itemName,
            itemInStock,
            itemImgUrl,
            itemDescription
        } = req.body;
        const item = new Items({
            itemName,
            itemInStock,
            itemImgUrl,
            itemDescription
        });
        Items.findOneAndUpdate({itemName : itemName},req.body).then(data => {
            res.status(200).json({message : 'Item updated successfully' , data});  
        },err => {
            res.status(500).json({message : 'Service error occured' , err});
        })
    }
    /**
     * deleteItems
     */
    public deleteItems = (req : Request , res : Response) =>  {
        let itemName : string = req.params ? req.params.itemName : '';
        Items.findOneAndRemove({itemName : itemName}).then(data => {
            res.status(200).json({message : 'Item deleted successfully' , data});
        },err => {
            res.status(500).json({message : 'Service error occured',err});
        })
    }
    /**
     * fetchItemInfo
     */
    public fetchItemInfo = (req : Request , res : Response) => {
        let itemName : string = req.params ? req.params.itemName : '';
        Items.findOne({itemName : itemName}).then(data => {
            res.status(200).json({message : 'Success', data});
        },err => {
            res.status(500).json({message : 'Service error occured' , err});
        })
    }
}
const itemRouter = new ItemsRouter();
itemRouter.routes();
export default itemRouter.router;