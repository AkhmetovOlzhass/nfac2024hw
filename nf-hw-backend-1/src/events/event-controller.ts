import { Request, Response } from 'express';
import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventService from './event-service';
import AuthService from '../auth/auth-service';


class EventController {
    private eventService : EventService;
    private authService: AuthService;


    constructor(eventService : EventService, authService: AuthService){
        this.eventService = eventService;
        this.authService = authService;
    }

    createEvent = (req:Request,res:Response) =>{
        try{
            const event: CreateEventDto =req.body;
            const newEvent = this.eventService.createEvent(event);
            res.status(201).json(newEvent);
        }catch(error:any){
            res.status(500).json({ error: error.message });
        }
    }

    getEvents  = (req:Request, res:Response) =>{
        try{

            const sortBy = req.query.sortBy as string || 'date';
            const sortDirection = req.query.sortDirection as string || 'asc';

            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 2;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            let events = this.eventService.getEvents();

            events = events.sort((a, b) => {
                if (sortDirection === 'desc') {
                    return a[sortBy] > b[sortBy] ? -1 : 1;
                } else {
                    return a[sortBy] > b[sortBy] ? 1 : -1;
                }
            });

            const paginatedEvents = events.slice(startIndex, endIndex);

            res.status(200).json({
                currentPage: page,
                perPage: limit,
                total: events.length,
                totalPages: Math.ceil(events.length / limit),
                data: paginatedEvents
            });
        }catch (error: any) {
            res.status(500).json({ error: error.message });
          }
    }

    getEventsByCity  = (req:Request, res:Response) =>{
        try{
            
            const token = req.headers.authorization?.split(' ')[1];
            
            if(!token){
                return res.status(401).json({ message: 'Authorization token is missing' });
            }

            const decoded = this.authService.verifyJwt(token);
            if(!decoded){
                return res.status(401).json({ message: 'Authorization token is missing' });
            }
            
            const userCity = decoded.city;
            
            
            const events = this.eventService.getEvents().filter(event => {
                const eventCity = event.location.split(',')[0].trim();
                return eventCity === userCity;
              });

            res.status(200).json(events);
        }catch (error: any) {
            res.status(500).json({ error: error.message });
          }
    }

    getEventById = (req:Request, res:Response) =>{
        try{
            const params = req.params;
            const id = parseInt(params.id);
            const event = this.eventService.getEventById(id);
            if(!event){
                res.status(404).json({error:"Event not found"});
            }else{
                res.status(200).json(event);
            }
        }catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

}

export default EventController;