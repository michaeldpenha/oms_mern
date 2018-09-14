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
        this.router.post('/', this.addItems)
    }
    /**
     * fetchItems
     */
    public fetchItems = (req: Request, res: Response) => {
        Items.find().then(data => {
            res.status(200).json({ data });
        }, err => {
            res.status(500).json({ err });
        })
    }
    /**
     * addItems
     */
    public addItems = (req: Request, res: Response): void => {
        const {
            itemId,
            itemName,
            itemInStock,
            itemImgUrl,
            itemDescription
        } = req.body;

        const item = new Items({
            itemId,
            itemName,
            itemInStock,
            itemImgUrl,
            itemDescription
        });
        item.save().then(data => {
            res.status(201).json({data});
        },err=>{
            res.status(500).json({err});
        });
    }
}
const itemRouter = new ItemsRouter();
itemRouter.routes();
export default itemRouter.router;