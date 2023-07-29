import { pool } from "../../../mysql";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";

class VideoRepository {
  create(request: Request, response: Response) {
    const { title, description, user_id } = request.body;
    pool.getConnection((err: any, connection: any) => {
      connection.query(
        "INSERT INTO videos (video_id, user_id, title, description) VALUES (?,?,?,?)",
        [uuidv4(), user_id, title, description],
        (error: any, result: any, fields: any) => {
          connection.release();
          if (error) {
            return response.status(400).json(error);
          }
          response.status(200).json({ success: "Video created" });
        }
      );
    });
  }

  getVideos(request: Request, response: Response) {
    //Method to take all users' videos
    const { user_id } = request.query;
    pool.getConnection((err: any, connection: any) => {
      connection.query(
        "SELECT * FROM videos WHERE user_id = ?",
        [user_id],
        (error: any, results: any, fields: any) => {
          connection.release();
          if (error) {
            return response
              .status(400)
              .json({ error: "Error searching for videos!" });
          }
          return response
            .status(200)
            .json({ message: "Videos retrieve successfully", videos: results });
        }
      );
    });
  }

  searchVideos(request: Request, response: Response) {
    //Method to take all users' videos
    const { search } = request.query;
    pool.getConnection((err: any, connection: any) => {
      connection.query(
        "SELECT * FROM videos WHERE title LIKE ?",
        [`%${search}%`],
        (error: any, results: any, fields: any) => {
          connection.release();
          if (error) {
            return response
              .status(400)
              .json({ error: "Error searching for videos!" });
          }
          return response
            .status(200)
            .json({ message: "Videos retrieve successfully", videos: results });
        }
      );
    });
  }
}

export { VideoRepository };
