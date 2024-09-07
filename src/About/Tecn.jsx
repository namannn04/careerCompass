import React, { useEffect, useRef } from 'react';
import "./Techn.css";

export default function tecn() {
    const paragraphRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('enter');
              entry.target.classList.remove('exit');
            } else {
              entry.target.classList.remove('enter');
              entry.target.classList.add('exit');
            }
          });
        },
        { threshold: 0.1 }
      );
  
      if (paragraphRef.current) {
        observer.observe(paragraphRef.current);
      }
  
      return () => {
        if (paragraphRef.current) {
          observer.unobserve(paragraphRef.current);
        }
      };
    }, []);
  
    return (
      <div className="animated_container_tecn">
        <div ref={paragraphRef} className="animated_para_tecn">
          <div className="line_tecn line-1">This website offers practical techniques</div>
          <div className="line_tecn line-2">to help you stay focused on your studies</div>
          <div className="line_tecn line-3">while providing valuable guidance for your career and life.</div>
          <div className="line_tecn line-4">With tips for stress relief and time management,</div>
          <div className="line_tecn line-5">we aim to create a balanced approach</div>
          <div className="line_tecn line-6">to both academic success and personal well-being,</div>
          <div className="line_tecn line-7">empowering you to achieve your goals</div>
          <div className="line_tecn line-8">with clarity and confidence.</div>
        </div>
      </div>
    );
}
  