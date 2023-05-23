import HeaderCategory from "./HeaderCategory";
import StateProvider from "./state-provider";

export default function HomeLayout({ children }) {
  return (
    <section className="w-full items-center">
      <StateProvider>
        <HeaderCategory />
        <div className="max-w-6xl w-full px-20 mx-auto">{children}</div>
      </StateProvider>
    </section>
  );
}
