import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div>
      <Input />
      <Button>
        Primary
      </Button>
      <Button variant="secondary">
        Secondary
      </Button>
      <Button variant="ghost">
        Ghost
      </Button>
      <Button variant="link">
        Link
      </Button>
      <Button disabled>
        Disabled
      </Button>
      <Button variant="destructive">
        Destructive
      </Button>
      <Button variant="outline">
        Outline
      </Button>
    </div>
  );
}
