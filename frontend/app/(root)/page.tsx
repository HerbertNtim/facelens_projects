
export default async function Home() {
  return (
    <>
      <div className="font-sans text-2xl font-bold">facelens</div>
    </>
  );
}

// async function fetchApi() {
//   const baseUrl = 'http://localhost:8000';

//   try {
//     const response = await fetch(
//       `${baseUrl}/`
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch data");
//     }
//     const role = await response.json();
//     return role;
//   } catch (error) {
//     console.error("Error fetching engineer role:", error);
//     return null;
//   }

// }
