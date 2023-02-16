import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  CommentInput,
  CourseHashTag,
  CourseTitle,
  LikeBtn,
  CommentAsc,
  CommentDesc,
} from "../components/course";
import { PostTitle, PostHashTag } from "../components/post";

const Course = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [desc, setDesc] = useState(true);
  const paramId = useParams().id;

  return (
    <div className="w-11/12 md:w-3/4 m-auto">
      {isEdit ? <PostTitle /> : <CourseTitle setIsEdit={setIsEdit} />}
      {isEdit ? (
        <>
          <PostHashTag />
          <button
            onClick={() => setIsEdit(false)}
            className="bg-gray-300 px-4 sm:px-8 py-1 rounded-xl float-right"
          >
            취소
          </button>
        </>
      ) : (
        <CourseHashTag />
      )}
      <LikeBtn />
      <CommentInput paramId={paramId} />
      <div className="mb-10">
        <div>
          <input
            id="desc"
            type="button"
            onClick={() => {
              setDesc(true);
            }}
            value="최신순"
            style={
              desc === true
                ? { fontWeight: 600, textDecoration: "underline" }
                : undefined
            }
            className="mr-2 mb-4"
          />
          <input
            id="asc"
            type="button"
            onClick={() => {
              setDesc(false);
            }}
            value="오래된 순"
            style={
              desc === false
                ? { fontWeight: 600, textDecoration: "underline" }
                : undefined
            }
          />
        </div>

        {desc === true ? (
          <CommentDesc paramId={paramId} />
        ) : (
          <CommentAsc paramId={paramId} />
        )}
      </div>
    </div>
  );
};

export default Course;
