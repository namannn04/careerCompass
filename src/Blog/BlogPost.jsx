import React, { useState, useEffect } from "react";
// import "./index.css";

const BlogPost = ({
  title,
  author,
  data,
  career,
  content,
  quote,
  quoteAuth,
  head,
}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [visibleIndices, setVisibleIndices] = useState(new Set());

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".qa-section");
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && !visibleIndices.has(index)) {
          setVisibleIndices((prev) => new Set(prev).add(index));
          setTimeout(() => {
            section.classList.add("transition-complete");
          }, 800);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleIndices]);

  return (
    <div style={styles.container}>
      <h1 className="title">{title}</h1>
      <div className="quoteCont">
        <div className="quote">{quote}</div>
        <div className="quoteAuth">{quoteAuth}</div>
      </div>
      <div className="headBlog">Crafting a Career</div>
      <div className="blogInfo">{data}</div>
      <h3 className="headAuth"> by {author}</h3>
      {content.map((section, index) => (
        <div
          key={index}
          className={`qa-section ${
            visibleIndices.has(index) ? "visible transition-complete" : ""
          } ${activeIndex === index ? "active" : ""}`}
          onClick={() => toggleAnswer(index)}
          style={{
            flexDirection: section.imageUrl ? "row" : "column",
            alignItems: section.imageUrl ? "center" : "flex-start",
          }}
        >
          <div
            className="qa-content"
            style={{ flex: section.imageUrl ? 1 : "auto" }}
          >
            <div className="question">
              <h2>{section.question}</h2>
            </div>
            <div
              className="answer"
              style={{
                maxHeight: activeIndex === index ? "500px" : "0",
                opacity: activeIndex === index ? 1 : 0,
              }}
            >
              <p>{section.answer}</p>
            </div>
            <button className="reveal-button">
              {activeIndex === index ? "Hide Answer" : "Click to Reveal Answer"}
            </button>
          </div>
          {section.imageUrl && (
            <div className="qa-image">
              <img
                src={section.imageUrl}
                alt={` ${section.question}`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: "10px",
  },
};

export default BlogPost;
