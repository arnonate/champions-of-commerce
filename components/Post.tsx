import React from "react";

import * as Icon from "@components/Icon";
import { Post as PostType } from "@pages/index";

type PostProps = {
  post: PostType.Processed;
};

const Post = ({ post }: Readonly<PostProps>) => {
  const [imageIsLoaded, setImageIsLoaded] = React.useState(false);
  const image = React.useRef(null);

  React.useEffect(() => {
    // @ts-ignore
    if (image?.current?.complete) {
      setImageIsLoaded(true);
    }
  }, [post]);

  return (
    <div className="post">
      <div className="post-image">
        <picture>
          {!imageIsLoaded && (
            <source
              srcSet={require(`../public/images/uploads/${post.thumbnail}?lqip`)}
              type="image/jpeg"
            />
          )}
          <source
            srcSet={require(`../public/images/uploads/${post.thumbnail}?webp`)}
            type="image/webp"
          />
          <img
            className={!imageIsLoaded ? "blur" : ""}
            src={require(`../public/images/uploads/${post.thumbnail}`)}
            onLoad={() => setImageIsLoaded(true)}
            ref={image}
          />
        </picture>
      </div>

      <div className="post-content">
        <h2>{post.name}</h2>

        <div className="post-options">
          {post.delivery ? <Icon.Delivery /> : null}
          {post.pickup ? <Icon.Takeout /> : null}
          {post.masks ? <Icon.Mask /> : null}
        </div>

        <p>
          {post.content}
          <br />
          {post.masked ? <b>Employees wear masks.</b> : null}
        </p>

        {post.giftcard || post.number || post.website ? (
          <div className="post-buttons">
            {post.website ? (
              <a
                className="button"
                href={post.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website
              </a>
            ) : null}

            {post.giftcard ? (
              <a
                className="button"
                href={post.giftcard}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy Giftcard Online
              </a>
            ) : null}

            {post.number ? (
              <a
                className="button"
                href={`tel:${post.number}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Call for Giftcard
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Post;
