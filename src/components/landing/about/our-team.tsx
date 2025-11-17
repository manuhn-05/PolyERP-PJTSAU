
import { FaRegUser } from "react-icons/fa";
import { OUR_TEAM_LIST } from "@/components/landing/landing-page-constants";


export function Team() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {OUR_TEAM_LIST.map((member) => (
        <li key={member.name} className="rounded-2xl border border-border/60 p-6">
          <div className="flex items-center gap-4">
            <FaRegUser className={`text-[1.75em]`} />
            <div>
              <p className="font-medium">{member.name}</p>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
