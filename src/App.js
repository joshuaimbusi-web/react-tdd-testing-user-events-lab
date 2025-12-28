import { useState } from "react";

const INTEREST_OPTIONS = ["React", "Testing", "JavaScript"];

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: {},
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleCheckboxChange(event) {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      interests: {
        ...formData.interests,
        [name]: checked,
      },
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  const selectedInterests = Object.keys(formData.interests).filter(
    (interest) => formData.interests[interest]
  );

  return (
    <main>
      <h1>Hi, I'm (your name)</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />

      <h2>About Me</h2>
      <p>Lorem ipsum dolor sit amet...</p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

      <h2>Newsletter Signup</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <fieldset>
          <legend>Interests</legend>

          {INTEREST_OPTIONS.map((interest) => (
            <label key={interest}>
              <input
                type="checkbox"
                name={interest}
                checked={!!formData.interests[interest]}
                onChange={handleCheckboxChange}
              />
              {interest}
            </label>
          ))}
        </fieldset>

        <button type="submit">Submit</button>
      </form>

      <section>
        <p>{formData.name}</p>
        <p>{formData.email}</p>

        {submitted && (
          <>
            <p>Thank you for signing up for the newsletter!</p>

            {selectedInterests.length > 0 && (
              <ul>
                {selectedInterests.map((interest) => (
                  <li key={interest}>{interest}</li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default App;
