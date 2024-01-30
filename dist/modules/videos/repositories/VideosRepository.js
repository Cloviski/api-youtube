"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoRepository = void 0;
const mysql_1 = require("../../../mysql");
const uuid_1 = require("uuid");
class VideoRepository {
  create(request, response) {
    const { title, description, user_id, thumbnail, publishedAt } =
      request.body;
    mysql_1.pool.getConnection((err, connection) => {
      connection.query(
        "INSERT INTO videos (video_id, user_id, title, description, thumbnail, publishedAt) VALUES (?,?,?,?,?,?)",
        [(0, uuid_1.v4)(), user_id, title, description, thumbnail, publishedAt],
        (error, result, fields) => {
          connection.release();
          if (error) {
            return response.status(400).json(error);
          }
          response.status(200).json({ success: "Video created" });
        }
      );
    });
  }
  getVideos(request, response) {
    //Method to take all users' videos
    const { user_id } = request.query;
    mysql_1.pool.getConnection((err, connection) => {
      connection.query(
        "SELECT * FROM videos WHERE user_id = ?",
        [user_id],
        (error, results, fields) => {
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
  searchVideos(request, response) {
    const { search } = request.query;
    mysql_1.pool.getConnection((err, connection) => {
      connection.query(
        "SELECT * FROM videos WHERE title LIKE ? OR description LIKE ?",
        [`%${search}%`, `%${search}%`],
        (error, results, fields) => {
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
exports.VideoRepository = VideoRepository;
