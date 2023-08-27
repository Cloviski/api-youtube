import { Router } from "express";
import { VideoRepository } from "../modules/videos/repositories/VideosRepository";
import { login } from "../middleware/login";

const videosRoutes = Router();
const videosRepository = new VideoRepository();

videosRoutes.post("/create-video", login, (request, response) => {
  videosRepository.create(request, response);
});

videosRoutes.get("/get-videos", login, (request, response) => {
  videosRepository.getVideos(request, response);
});

videosRoutes.get("/search", (request, response) => {
  videosRepository.searchVideos(request, response);
});

export { videosRoutes };
