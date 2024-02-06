"use client";
import { validateField } from "../../services/form/validateField";
import styles from "./ContactForm.module.scss";
import React, { FormEvent, useState } from "react";

type ContactFormProps = {};

const ContactForm: React.FC<ContactFormProps> = ({}) => {
  const [errors, setErrors] = useState<Record<string, boolean>>({
    name: false,
    email: false,
    subject: false,
    content: false,
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      name,
      email,
      subject,
      content,
    };

    // Basic field validation
    let currentErrors = { ...errors };
    let hasErrors = false;

    if (!validateField("text", name)) {
      console.log("Name not valid");
      currentErrors.name = true;
      hasErrors = true;
    }

    if (!validateField("email", email)) {
      console.log("Email not valid");
      currentErrors.email = true;
      hasErrors = true;
    }

    if (!validateField("text", subject)) {
      console.log("Subject not valid");
      currentErrors.subject = true;
      hasErrors = true;
    }

    if (!validateField("text", content)) {
      console.log("Content not valid");
      currentErrors.content = true;
      hasErrors = true;
    }

    // Got errors, bail, state will handle updating DOM
    if (hasErrors) {
      setErrors(currentErrors);
      return;
    }

    // Got here, send the form to our API
    const req = await fetch("/api/v1/hey", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const res = await req.json();

    // Is there a server side error?
    if (res.errors) {
      setErrors(res.errors);
      return;
    }

    // All good, do something
    // reset form
    // let user know all good
    console.log("All good");
    console.log(res);
  };

  return (
    <div className={styles["contact-wrapper"]}>
      <form onSubmit={handleFormSubmit}>
        <div className={styles["contact-field-wrapper"]}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            data-error={errors.name}
            onClick={() =>
              setErrors({
                ...errors,
                name: false,
              })
            }
            onBlur={(e) =>
              setErrors({
                ...errors,
                name: !validateField("text", e.target.value),
              })
            }
          />
          <span className={styles["error-notice"]}>Some error message</span>
        </div>
        <div className={styles["contact-field-wrapper"]}>
          <label>Email</label>
          <input
            data-error={errors.email}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onClick={() =>
              setErrors({
                ...errors,
                email: false,
              })
            }
            onBlur={(e) =>
              setErrors({
                ...errors,
                email: !validateField("email", e.target.value),
              })
            }
          />
          <span className={styles["error-notice"]}>Some error message</span>
        </div>
        <div className={styles["contact-field-wrapper"]}>
          <label>Subject</label>
          <input
            data-error={errors.subject}
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            onClick={() =>
              setErrors({
                ...errors,
                subject: false,
              })
            }
            onBlur={(e) =>
              setErrors({
                ...errors,
                subject: !validateField("text", e.target.value),
              })
            }
          />
          <span className={styles["error-notice"]}>Some error message</span>
        </div>
        <div className={styles["contact-field-wrapper"]}>
          <label>Message</label>
          <textarea
            data-error={errors.content}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onClick={() =>
              setErrors({
                ...errors,
                content: false,
              })
            }
            onBlur={(e) =>
              setErrors({
                ...errors,
                content: !validateField("text", e.target.value),
              })
            }
          />
          <span className={styles["error-notice"]}>Some error message</span>
        </div>
        <div className={styles["contact-field-wrapper"]}>
          <input type="submit" placeholder="Submit" />
        </div>
      </form>
    </div>
  );
};

export { ContactForm };
