import cookie from "cookie";
import { GetServerSideProps } from "next";

export function parseCookies(req) {
  const parsedCookie = cookie.parse(req ? req.headers.cookie : "");
  console.log({ parsedCookie });
  return parsedCookie["simplyshift"]
    ? JSON.parse(parsedCookie["simplyshift"])
    : null;
}

// export const getUserData: GetServerSideProps = async (ctx) => {
//   console.log({ ctx });
//   const data = parseCookies(ctx.req);
//   console.log({ data });
//
//   if (!data) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }
//
//   return {
//     props: { token: data },
//   };
// };
