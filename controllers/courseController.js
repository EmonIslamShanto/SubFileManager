import Course from '../models/Course.js';

// Create a new course
export const createCourse = async (req, res, next) => {
  try {
    const { title, description, modules } = req.body;

    // Create a new course object
    const course = new Course({
      title,
      description,
      modules: modules || [],  // Ensure modules is an array, default to empty if not provided
    });

    // Save the new course to the database
    await course.save();

    // Respond with the created course
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};


export const updateCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { modules, title, description } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (title) course.title = title;
    if (description) course.description = description;

    if (modules) {
      modules.forEach((module) => {
        const { moduleId, action, moduleName, videos } = module;

        if (action === 'add') {
          course.modules.push({ moduleName, videos });
        } else if (action === 'update') {
          const existingModule = course.modules.id(moduleId);
          if (existingModule) {
            if (moduleName) existingModule.moduleName = moduleName;
            if (videos) {
              videos.forEach((video) => {
                const { videoId, action: videoAction, title, url } = video;

                if (videoAction === 'add') {
                  existingModule.videos.push({ title, url });
                } else if (videoAction === 'update') {
                  const existingVideo = existingModule.videos.id(videoId);
                  if (existingVideo) {
                    if (title) existingVideo.title = title;
                    if (url) existingVideo.url = url;
                  }
                } else if (videoAction === 'remove') {
                  existingModule.videos.id(videoId).remove();
                }
              });
            }
          }
        } else if (action === 'remove') {
          course.modules.id(moduleId).remove();
        }
      });
    }

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (err) {
    next(err);
  }
};
