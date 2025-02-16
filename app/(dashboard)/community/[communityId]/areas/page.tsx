
import AddAreaButton from "./_components/add-area-button";
import { getAreas } from "./_actions/get-areas";
import { usePathname } from "next/navigation";

const Areas = async () => {
  const areas = await getAreas(47);
  console.log(areas);
  return (
    <div>
      <AddAreaButton />
      <div>
        {areas.map((area) => {
          return (
            <div key={area.id} className="mt-4 uppercase font-bold">
              <h1>id da area: {area.id}</h1>
              <h1>nome da area: {area.name}</h1>
              <p>descricao da area: {area.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Areas;
