import { t as CanvasBoard } from "./CanvasBoard-BkuvFQUC.js";
import "./useResourceStore-BOiKP0QI.js";
import "./tabs-B2mX55jM.js";
import { Kt as require_jsx_runtime, O as useFunnelStore_default, en as useParams, in as __toESM } from "./index-Dx7DXd78.js";
import "./badge-D42ee-2w.js";
import "./ConfirmDialog-Dr5k4tWU.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function Canvas() {
	const { id } = useParams();
	const [funnels, setFunnels] = useFunnelStore_default();
	const funnel = funnels.find((f) => f.id === id);
	if (!funnel) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8 text-center text-[#8C7B6C] font-bold",
		children: "Funil não encontrado."
	});
	const updateFunnel = (updated) => {
		setFunnels((prev) => prev.map((f) => f.id === id ? updated : f));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex-1 w-full h-full flex flex-col overflow-hidden animate-fade-in bg-[#FAF7F2] relative",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 w-full h-full relative flex overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CanvasBoard, {
				funnel,
				onChange: updateFunnel
			})
		})
	});
}
export { Canvas as default };

//# sourceMappingURL=Canvas-CwxBf6zA.js.map