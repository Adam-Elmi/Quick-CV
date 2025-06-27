import { useShared } from "../Shared/SharedContext";

export default function Profile() {
  const { setInputValue } = useShared();
  return (
    <form>
      <h1>Profile Summary</h1>
      <input onChange={(e) => setInputValue(e.target.value)}  type="text" className="p-1 border-2 border-slate-200 rounded-md outline-none" placeholder="Enter your first name"/>
    </form>
  )
}