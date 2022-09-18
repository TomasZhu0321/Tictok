export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "caption",
      title: "caption",
      type: "string",
    },
    {
      name: "video",
      title: "Video",
      type: "file",
      options: {
        hotspot: true,
      },
    },
    {
      name: "userId",
      title: "userId",
      type: "string",
    },
    {
      name: "postedBy",
      title: "postedBy",
      type: "postedBy",
    },
    {
      name: "likes",
      title: "likes",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "user" }],
        },
      ],
    },
    {
      name: "comments",
      title: "comments",
      type: "array",
      of: [{ type: "comment" }],
    },
    {
        name: "topic",
        title: "topic",
        type: "string",
      },
  ],
};
