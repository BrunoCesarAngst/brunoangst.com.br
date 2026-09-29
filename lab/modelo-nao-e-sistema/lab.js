const models = {
  gpt: {
    name: "GPT",
    provider: "OpenAI",
    code: '"gpt"',
  },

  claude: {
    name: "Claude",
    provider: "Anthropic",
    code: '"claude"',
  },

  local: {
    name: "Local Model",
    provider: "Local runtime",
    code: '"local"',
  },
};


const buttons = [
  ...document.querySelectorAll(
    ".model-button"
  ),
];

const currentModel =
  document.querySelector(
    "#current-model"
  );

const currentProvider =
  document.querySelector(
    "#current-provider"
  );

const codeModel =
  document.querySelector(
    "#code-model"
  );

const runtimeChange =
  document.querySelector(
    "#runtime-change"
  );

const changeMessage =
  document.querySelector(
    "#change-message"
  );

const runtimeCard =
  document.querySelector(
    "#runtime-card"
  );


let activeModel = "gpt";


function changeModel(id) {

  if (!models[id]) {
    return;
  }


  if (id === activeModel) {

    changeMessage.textContent =
      `Runtime atual: ${models[id].name}. externalState permanece intacto.`;

    return;
  }


  const previous =
    models[activeModel];

  const next =
    models[id];


  /*
   * Apenas o runtime é substituído.
   *
   * O externalState não pertence
   * ao modelo e não é alterado aqui.
   */

  currentModel.textContent =
    next.name;

  currentProvider.textContent =
    next.provider;

  codeModel.textContent =
    next.code;

  runtimeChange.textContent =
    `${previous.name} → ${next.name}`;

  changeMessage.textContent =
    `Runtime alterado. externalState permaneceu intacto.`;


  buttons.forEach(
    (button) => {

      const isActive =
        button.dataset.model === id;

      button.classList.toggle(
        "active",
        isActive
      );

      button.setAttribute(
        "aria-pressed",
        String(isActive)
      );

    }
  );


  runtimeCard.classList.remove(
    "runtime-changing"
  );


  /*
   * Força o navegador a reconhecer
   * uma nova execução da animação.
   */

  void runtimeCard.offsetWidth;


  runtimeCard.classList.add(
    "runtime-changing"
  );


  activeModel = id;
}


buttons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        changeModel(
          button.dataset.model
        );

      }
    );

  }
);