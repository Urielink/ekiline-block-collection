// Script compartido para Collapse — se carga UNA vez aunque coexistan
// ekiline-accordion y ekiline-collapse en la misma página. Cada bloque
// referencia este handle en block.json en lugar de su propio view.js,
// evitando que Bootstrap registre el listener de click en document dos veces.
import Collapse from 'bootstrap/js/src/collapse.js';

export default Collapse;
