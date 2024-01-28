"use client";
import styles from "./ContactForm.module.scss";
import React, { useState } from "react";

type ContactFormProps = {};

const ContactForm: React.FC<ContactFormProps> = ({}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className={styles["contact-wrapper"]}>
      <div className={styles["contact-field-wrapper"]}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles["contact-field-wrapper"]}>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles["contact-field-wrapper"]}>
        <label>Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className={styles["contact-field-wrapper"]}>
        <label>Message</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className={styles["contact-field-wrapper"]}>
        <input type="submit" placeholder="Submit" />
      </div>
    </div>
  );
};

export { ContactForm };
