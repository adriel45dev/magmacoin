import { createClient } from "@supabase/supabase-js";
import Head from "next/head";
import Image from "next/image";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3bHdqZXBwaWNkcXR1bXJkdm52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTA1NjkxMTQsImV4cCI6MTk2NjE0NTExNH0.Ii6VMNALkG2b49Z9IcNPEuIdO0nA2g5_tsh-VjyJ59o";
const SUPABASE_URL = "https://rwlwjeppicdqtumrdvnv.supabase.co";
const supabaseCliente = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function login() {
  const inputHash = document.querySelector("#hash");
  const inputPassword = document.querySelector("#password");

  if (inputHash.value != "" && inputPassword.value != "") {
    supabaseCliente
      .from("usuarios")
      .select("*")
      .then((dados) => {
        let user = dados.data.filter((e) => e.private == inputHash.value);

        if (user.length != 0) {
          if (user[0].password == inputPassword.value) {
            window.location.href = `/wallet?wallet=${user[0].wallet}&hash=${user[0].hash}&key=${user[0].private}`;
          } else {
            alert("Senha incorreta!");
          }
        } else {
          alert("Usuário não cadastrado!");
        }
      });
  }
}

function HomePage() {
  return (
    <>
      <Head>
        <title>MagmaCoin - Wallet</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="./favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="./favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="./favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="./favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="./favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="./favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="./favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="./favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="./favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="./favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="./favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="./favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="./favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="./favicon/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="./favicon/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>

      <div className="container text-center ">
        <main className="form-signin center">
          <form>
            <img
              className="mb-4"
              src="./img/magma.png"
              alt=""
              width="200"
              height="200"
            />
            <h1 className="h3 mb-3 fw-normal">MagmaCoin</h1>

            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="hash"
                placeholder="Chave Privada"
              />
              <label htmlFor="hash">Chave Privada</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Senha"
              />
              <label htmlFor="password">Senha</label>
            </div>

            <div className="checkbox mb-3">
              <label>
                {" "}
                <input type="checkbox" value="remember-me" /> Lembrar{" "}
              </label>
            </div>

            <button
              className="w-100 btn btn-lg btn-dark mb-2 entrar"
              type="button"
              onClick={login}
            >
              Entrar
            </button>
            <button
              className="w-100 btn btn-lg btn-dark cadastro"
              type="button"
              onClick={() => (window.location.href = "cadastro")}
            >
              Cadastrar
            </button>

            <p className="mt-5 mb-3 text-muted">&copy; 2022 - Entre 3 Mundos</p>
          </form>
        </main>
      </div>
    </>
  );
}

export default HomePage;
