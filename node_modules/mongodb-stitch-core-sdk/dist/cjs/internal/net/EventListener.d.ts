import Event from "./Event";
interface EventListener {
    onEvent(event: Event): void;
}
export default EventListener;
