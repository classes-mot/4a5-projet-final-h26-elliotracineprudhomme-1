import Header from "../header/Header";
import "./ErrorPage.css"
const ErrorPage = () => {
  return (
    <>
      <Header />
      <main>
        <div className="error-card">
          <h1>Une erreur est survenue!</h1>
          <p>Cette page est introuvable ...</p>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
