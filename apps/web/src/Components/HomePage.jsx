import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <div className="flex flex-row px-2 py-4 justify-end items-end">
        <Link to={"/auth/login"}>Login</Link>
      </div>
      <div className="flex flex-col px-2 md:px-40 justify-center content-center items-center mt-6 mb-14">
        <div>TaskFlow is Alive?</div>
        {/* Link do heartbeatu maan */}
        <h1 className="text-center text-[2rem] font-semibold mb-4">
          Twoje Miejsce na Skuteczne Zarządzanie Zadaniami
        </h1>
        <p className=" text-center">
          Czy czujesz, że codzienne obowiązki i projekty przytłaczają Cię? Nasza
          platforma do zarządzania zadaniami,
          <span className="text-primary font-bold"> TaskFlow</span>, jest tutaj,
          aby Ci pomóc. Zrozumujemy, że w dzisiejszym dynamicznym świecie
          zarządzanie obowiązkami może stać się trudne i czasochłonne. Dlatego
          stworzyliśmy to narzędzie, aby uprościć Twój proces pracy i umożliwić
          Ci osiąganie celów z łatwością.
        </p>
        <Link to={"/auth/register"}>
          Sprawdź
          {/* <ArrowRight size={18} className="ml-1" /> */}
        </Link>
        <div className="border-spacing-6 p-2 ring-1 bg-primary/10 ring-primary/50 mt-10 border rounded-md">
          <img
            src={"/asana.png"}
            alt="How it looks"
            width={1174}
            height={904}
            className="rounded-md ring-1 ring-primary/10"
          />
        </div>
        <div className="self-start md:self-center">
          <h2 className="mt-10 text-[1.5rem] font-medium md:text-center">
            Zacznij korzystać w pare minut!
          </h2>
          <p className="text-black md:text-center">
            Zarządzanie czasem i organizacja zadań jest łatwiejsza z{" "}
            <span className="text-primary">TaskFlow</span>
          </p>
          <ol className="flex flex-col md:flex-row mt-5">
            <li className="space-y-4">
              <span className="text-primary">Krok 1</span>
              <p>
                Zabawę w organizację zacznij od{" "}
                <Link to={"/register"} className="text-primary">
                  Zarejestrowania się{" "}
                </Link>{" "}
                i stworzenia swojej tablicy
              </p>
            </li>
            <li className="space-y-4 mmd:py-5">
              <span className="text-primary">Krok 1</span>
              <p>
                Zabawę w organizację zacznij od{" "}
                <Link to={"/register"} className="text-primary">
                  Zarejestrowania się{" "}
                </Link>{" "}
                i stworzenia swojej tablicy
              </p>
            </li>
            <li className="space-y-4">
              <span className="text-primary">Krok 1</span>
              <p>
                Zabawę w organizację zacznij od{" "}
                <Link to={"/register"} className="text-primary">
                  Zarejestrowania się{" "}
                </Link>{" "}
                i stworzenia swojej tablicy
              </p>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
}
