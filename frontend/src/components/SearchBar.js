export default function SearchBar({ onSearch }) {
  return (
    <div style={{maxWidth:"400px", margin:"10px auto"}}>
      <input
        placeholder="🔍 Search by cuisine or ingredient..."
        onChange={(e)=>onSearch(e.target.value)}
      />
    </div>
  );
}
