import Head from "next/head";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3bHdqZXBwaWNkcXR1bXJkdm52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTA1NjkxMTQsImV4cCI6MTk2NjE0NTExNH0.Ii6VMNALkG2b49Z9IcNPEuIdO0nA2g5_tsh-VjyJ59o";
const SUPABASE_URL = "https://rwlwjeppicdqtumrdvnv.supabase.co";
const supabaseCliente = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function pay(hash, wallet, key) {
  const hashInput = document.querySelector("#hash");
  const valorInput = document.querySelector("#valor");

  if (hashInput.value != "" && valorInput.value > 0) {
    console.log(hashInput.value);
    supabaseCliente
      .from("usuarios")
      .select("*")
      .then((dados) => {
        let user = dados.data.filter((e) => e.hash == hash && e.private == key);
        let outro = dados.data.filter((e) => e.hash == hashInput.value);

        if (user.length != 0) {
          if (outro.length != 0) {
            const saldo = parseFloat(user[0].wallet);
            const transfer = parseFloat(valorInput.value);

            console.log(saldo);

            if (saldo >= transfer) {
              supabaseCliente
                .from("usuarios")
                .update({ wallet: saldo - transfer })
                .match({ hash: user[0].hash })
                .then(() => {
                  alert("FORAM DEBITADOS: $" + transfer + " MAGMAS");
                  document.querySelector(".dp-saldo").textContent = `$${
                    saldo - transfer
                  }`;
                })
                .catch((e) => {
                  alert("ALGO DE ERRADO");
                });

              supabaseCliente
                .from("usuarios")
                .update({ wallet: outro[0].wallet + transfer })
                .match({ hash: outro[0].hash });
            } else {
              alert("TRANSAÇÃO NEGADA");
            }
          } else {
            alert("Conta Inválida");
          }
        } else {
          alert("Sua chave pública é incompatível com sua chave privada!");
        }
      });
  }
}

function Wallet() {
  const router = useRouter();
  const { hash, wallet, key } = router.query;
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
              src="./img/wallet.png"
              alt=""
              width="72"
              height="72"
            />
            <h1 className="alert alert-success">{hash}</h1>
            <h4 className="h4 mb-3 fw-normal">Saldo Magmacoin</h4>

            <h1 className="card dp-saldo">${wallet}</h1>

            <p className="card-text">
              Insira qual a chave de envio escolhida por quem vai receber esse
              Magmacoin
            </p>

            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="hash"
                placeholder="JHSYTDLOIUYDS"
              />
              <label htmlFor="hash">Número da carteira</label>
            </div>

            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                id="valor"
                placeholder="Valor"
              />
              <label htmlFor="valor">Valor a pagar</label>
            </div>

            <button
              className="w-100 btn btn-lg btn-dark transfer"
              type="button"
              onClick={() => {
                pay(hash, wallet, key);
              }}
            >
              PAGAR
            </button>

            <p className="mt-5 mb-3 text-muted">&copy; 2022 - Entre 3 Mundos</p>
          </form>
        </main>
      </div>
    </>
  );
}
export default Wallet;
