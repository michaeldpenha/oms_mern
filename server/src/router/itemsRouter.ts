import {Request , Response , Router} from 'express';
import Items from '../models/items';

export class ItemsRouter {
    public router : Router;
    constructor () {
        this.router = Router();
        this.routes();
    }

    /**
     * routes
     */
    public routes = () => {
        this.router.get('/',this.fetchItems);
    }
    /**
     * fetchItems
     */
    public fetchItems = (req : Request,res : Response) =>  {
        Items.find().then(data => {
            res.status(200).json({data});
        },err => {
            res.status(500).json({err});
        })
    }
}
const itemRouter = new ItemsRouter();
itemRouter.routes();
export default itemRouter.router;