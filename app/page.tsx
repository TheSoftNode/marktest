import GradingSystem from "@/components/Landing/Home";
import { ReduxProvider } from "@/src/redux/provider";

export default function Home()
{
  return (
    <ReduxProvider>
      <GradingSystem />
    </ReduxProvider>
  );
}
