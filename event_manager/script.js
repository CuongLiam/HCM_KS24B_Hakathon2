const saveEventsToStorage = () => {
  localStorage.setItem("e", JSON.stringify(events));
};

const loadEventsFromStorage = () => {
  const data = localStorage.getItem("e");
  return data ? JSON.parse(data) : null;
};

let events = loadEventsFromStorage() || [
  {
    name: "Tổ chức sinh nhật cho Mochi",
    date: "2025-04-24",
    place: "Queen Bee Palace",
    host: "Bố Cường",
  },
  {
    name: "Tổ chức sinh nhật cho baba",
    date: "2025-04-24",
    place: "Queen Bee Palace",
    host: "Bố Cường",
  },
  {
    name: "chia taytay sinh nhật cho Mochi",
    date: "2025-04-24",
    place: "Queen Bee Palace",
    host: "Bố Cường",
  },
  {
    name: "Tiệc cưới cho Mochi",
    date: "2025-04-24",
    place: "Queen Bee Palace",
    host: "Bố Cường",
  },
  {
    name: "partyparty sinh nhật cho Mochi",
    date: "2025-04-24",
    place: "Queen Bee Palace",
    host: "Bố Cường",
  },
];

let formSearch = document.getElementById("form-search");
let inputSearch = document.getElementById("keyword");
let keyword = "";

const renderEvents = () => {
  let filterEvent = events;

  if (keyword.trim() !== "") {
    filterEvent = events.filter((e) =>
      e.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  let html = filterEvent.reduce(
    (acc, e, idx) =>
      acc +
      `<tr>
        <td scope="row">${e.name}</td>
        <td>${e.date}</td>
        <td>${e.place}</td>
        <td>${e.host}</td>
        <td>
          <button class="btn btn-primary" onclick="openEditModal(${idx})">
            <i class="fa-solid fa-comment-pen"></i>
          </button>
        </td>
        <td>
          <button class="btn btn-danger" onclick="deleteEventByIdx(${idx})">
            <i class="fa-solid fa-trash-xmark"></i>
          </button>
        </td>
      </tr>`,
    ""
  );
  let tbody = document.getElementById("tbody");
  if (tbody) {
    tbody.innerHTML = html;
  } else {
    console.error("Table body element not found");
  }
};
// renderEvents();
document.addEventListener("DOMContentLoaded", renderEvents);

const deleteEventByIdx = (idx) => {
  if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) return;
  events = events.filter((_, index) => index !== idx);

  saveEventsToStorage();
  renderEvents();
};

const handleAddEvent = () => {
  let event = validateAddEvent();
  if (!event) return;

  events.push(event);
  saveEventsToStorage();
  renderEvents();

  document.getElementById("name").value = "";
  document.getElementById("date").value = "";
  document.getElementById("place").value = "";
  document.getElementById("host").value = "";
  alert("Thêm sự kiện thành công");
};

const validateAddEvent = () => {
  let name = document.getElementById("name").value;
  let date = document.getElementById("date").value;
  let place = document.getElementById("place").value;
  let host = document.getElementById("host").value;

  let isValid = true;

  if (name.trim() === "") {
    isValid = false;
    document.getElementById("error_name").innerText = "Không được để trống";
  } else {
    document.getElementById("error_name").innerText = "";
  }

  if (date.trim() === "") {
    isValid = false;
    document.getElementById("error_date").innerText = "Vui lòng chọn ngày";
  } else {
    document.getElementById("error_date").innerText = "";
  }

  if (place.trim() === "") {
    isValid = false;
    document.getElementById("error_place").innerText = "Không được để trống";
  } else {
    document.getElementById("error_place").innerText = "";
  }

  if (host.trim() === "") {
    isValid = false;
    document.getElementById("error_host").innerText = "Không được để trống";
  } else {
    document.getElementById("error_host").innerText = "";
  }

  return isValid ? { name, date, place, host } : null;
};

formSearch.addEventListener("input", function (e) {
  e.preventDefault();
  keyword = inputSearch.value;
  console.log("Keyword:", keyword);
  renderEvents();
});
const openEditModal = (id) => {
  const event = events[id];

  document.getElementById("edit_name").value = event.name;
  document.getElementById("edit_date").value = event.date;
  document.getElementById("edit_place").value = event.place;
  document.getElementById("edit_host").value = event.host;

  document
    .getElementById("save-edit-btn")
    .setAttribute("onclick", `handleEditSave(${id})`);

  const modal = new bootstrap.Modal(document.getElementById("modal-edit"));
  modal.show();
};

const handleEditSave = (id) => {
  const name = document.getElementById("edit_name").value;
  const date = document.getElementById("edit_date").value;
  const place = document.getElementById("edit_place").value;
  const host = document.getElementById("edit_host").value;

  let isValid = true;

  if (name.trim() === "") {
    isValid = false;
    document.getElementById("error_edit_name").innerText =
      "Không được để trống";
  } else {
    document.getElementById("error_edit_name").innerText = "";
  }

  if (date.trim() === "") {
    isValid = false;
    document.getElementById("error_edit_date").innerText = "Vui lòng chọn ngày";
  } else {
    document.getElementById("error_edit_date").innerText = "";
  }

  if (place.trim() === "") {
    isValid = false;
    document.getElementById("error_edit_place").innerText =
      "Không được để trống";
  } else {
    document.getElementById("error_edit_place").innerText = "";
  }

  if (host.trim() === "") {
    isValid = false;
    document.getElementById("error_edit_host").innerText =
      "Không được để trống";
  } else {
    document.getElementById("error_edit_host").innerText = "";
  }
  if (!isValid) return;

  events[id] = { name, date, place, host };

  saveEventsToStorage();
  renderEvents();

  const modal = bootstrap.Modal.getInstance(
    document.getElementById("modal-edit")
  );
  modal.hide();

  alert("Cập nhật sự kiện thành công!");
};

const darkButt = document.getElementById("dark-mode-toggle");

darkButt.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    darkButt.innerText = "Light Mode";
  } else {
    darkButt.innerText = "Dark Mode";
  }
});
