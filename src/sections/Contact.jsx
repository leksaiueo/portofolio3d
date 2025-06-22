import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertText, setAlertText] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); //spread formData
  };
  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertText(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("From Submitted : ", formData);
      await emailjs.send(
        "service_oe1jhcg",
        "template_yshs9p9",
        {
          from_name: formData.name,
          to_name: "Leksaiueo",
          from_email: formData.email,
          to_email: "bhaskaraleks@gmail.com",
          message: formData.message,
        },
        "HWAiL7YR-fRlsnN0m"
      );
      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", "Pesan Terkirim");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      showAlertMessage("failed", "Pesan gak bisa masuk nih");
    }
  };
  return (
    <section className="relative flex items-center c-space section-spacing">
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertText} />}
      <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading">Yok Ngobrol</h2>
          <p className="font-normal text-neutral-400">
            Dimanapun kamu mencari untuk pembuatan website yang menarik, keren,
            dan juga responsive. Aku disini membantu kok hehe
          </p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="field-label">
              Nama Lengkap
            </label>
            <input
              id="name"
              name="name"
              className="field-input"
              type="text"
              placeholder="Nama Lengkap Kamu"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="field-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus"
              placeholder="Email Kamu"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="name" className="field-label">
              Pesan
            </label>
            <textarea
              id="message"
              name="message"
              className="field-input field-input-focus"
              rows="4"
              type="text"
              placeholder="Isikan disini..."
              autoComplete="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation"
          >
            {!isLoading ? "Kirim Pesan" : "Loading..."}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
