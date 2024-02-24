import { Request, Response, Router } from "express";
import { VideoRepository } from "../modules/videos/repositories/VideosRepository";
import { login } from "../middleware/login";

const videosRoutes: Router = Router();
const videosRepository = new VideoRepository();

videosRoutes.post(
  "/create-video",
  login,
  (request: Request, response: Response) => {
    videosRepository.create(request, response);
  }
);

videosRoutes.get(
  "/get-videos",
  login,
  (request: Request, response: Response) => {
    videosRepository.getVideos(request, response);
  }
);

videosRoutes.get("/search", (request: Request, response: Response) => {
  videosRepository.searchVideos(request, response);
});

export { videosRoutes };
